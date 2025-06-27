// src/hooks/useViewTransition.ts
"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ViewTransitionOptions {
  onStart?: () => void;
  onReady?: () => void;
  onFinished?: () => void;
  onSkipped?: () => void;
}

export function useViewTransition() {
  const router = useRouter();

  const navigate = useCallback((
    path: string, 
    transitionName?: string,
    options?: ViewTransitionOptions
  ) => {
    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      router.push(path);
      options?.onSkipped?.();
      return;
    }

    options?.onStart?.();

    // Start the view transition
    const transition = document.startViewTransition(() => {
      router.push(path);
    });

    // Handle transition lifecycle
    transition.ready.then(() => {
      options?.onReady?.();
    });

    transition.finished.then(() => {
      options?.onFinished?.();
    }).catch(() => {
      // Handle any transition errors silently
    });

    return transition;
  }, [router]);

  const setViewTransitionName = useCallback((
    element: HTMLElement | null,
    name: string
  ) => {
    if (element) {
      element.style.viewTransitionName = name;
    }
  }, []);

  const clearViewTransitionName = useCallback((
    element: HTMLElement | null
  ) => {
    if (element) {
      element.style.viewTransitionName = 'none';
    }
  }, []);

  const isSupported = typeof document !== 'undefined' && 
    'startViewTransition' in document;

  return {
    navigate,
    setViewTransitionName,
    clearViewTransitionName,
    isSupported
  };
}

// Gallery-specific hook for managing gallery transitions
export function useGalleryTransition() {
  const { navigate, setViewTransitionName, clearViewTransitionName } = useViewTransition();

  const navigateToGallery = useCallback((
    slug: string,
    cardElement?: HTMLElement,
    imageElement?: HTMLElement
  ) => {
    const transitionName = `gallery-${slug}`;
    
    // Set transition names if elements are provided
    if (cardElement) {
      setViewTransitionName(cardElement, `gallery-card-${slug}`);
    }
    if (imageElement) {
      setViewTransitionName(imageElement, `gallery-image-${slug}`);
    }

    return navigate(`/gallery/${slug}`, transitionName, {
      onFinished: () => {
        // Clean up transition names
        if (cardElement) clearViewTransitionName(cardElement);
        if (imageElement) clearViewTransitionName(imageElement);
      }
    });
  }, [navigate, setViewTransitionName, clearViewTransitionName]);

  const navigateToHome = useCallback((
    slug: string,
    titleElement?: HTMLElement,
    imageElement?: HTMLElement
  ) => {
    // Set transition names for return journey
    if (titleElement) {
      setViewTransitionName(titleElement, `gallery-card-${slug}`);
    }
    if (imageElement) {
      setViewTransitionName(imageElement, `gallery-image-${slug}`);
    }

    return navigate('/', `gallery-${slug}`, {
      onFinished: () => {
        // Clean up transition names
        if (titleElement) clearViewTransitionName(titleElement);
        if (imageElement) clearViewTransitionName(imageElement);
      }
    });
  }, [navigate, setViewTransitionName, clearViewTransitionName]);

  return {
    navigateToGallery,
    navigateToHome,
    setViewTransitionName,
    clearViewTransitionName
  };
}