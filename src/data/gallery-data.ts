// src/data/gallery-data.ts

export interface GalleryItem {
    id: string;
    name: string;
    slug: string; // URL-friendly version
    coverImage: string;
    images: string[]; // All photos in this category
    description?: string; // Optional description for the category
  }
  
  export const galleryData: GalleryItem[] = [
    {
      id: "birthday",
      name: "Birthday",
      slug: "birthday",
      coverImage: "/images/occasions/birthday.JPG",
      description: "Birthday celebrations and special moments",
      images: [
        "/images/birthday.JPG",
        "/images/birthday-2.JPG",
        "/images/birthday-3.JPG",
        "/images/birthday-4.JPG",
        "/images/birthday-5.JPG",
        "/images/birthday-6.JPG",
        // Add more birthday photos as needed
      ]
    },
    {
      id: "cafes",
      name: "Cafes",
      slug: "cafes",
      coverImage: "/images/cafe/cafe.JPG",
      description: "Coffee shops and cozy cafe moments",
      images: [
        "/images/cafe.JPG",
        "/images/cafe-2.JPG",
        "/images/cafe-3.JPG",
        "/images/cafe-4.JPG",
        "/images/cafe-5.JPG",
        "/images/cafe-6.JPG",
      ]
    },
    {
      id: "disney",
      name: "Disney",
      slug: "disney",
      coverImage: "/images/disney/disney.JPG",
      description: "Magical Disney adventures",
      images: [
        "/images/disney.JPG",
        "/images/disney-2.JPG",
        "/images/disney-3.JPG",
        "/images/disney-4.JPG",
        "/images/disney-5.JPG",
        "/images/disney-6.JPG",
      ]
    },
    {
      id: "food",
      name: "Food",
      slug: "food",
      coverImage: "/images/food/finals.JPG",
      description: "Delicious meals and culinary experiences",
      images: [
        "/images/finals.JPG",
        "/images/food-2.JPG",
        "/images/food-3.JPG",
        "/images/food-4.JPG",
        "/images/food-5.JPG",
        "/images/food-6.JPG",
      ]
    },
    {
      id: "getty",
      name: "Getty",
      slug: "getty",
      coverImage: "/images/getty/getty.JPG",
      description: "Getty Center visits and art appreciation",
      images: [
        "/images/getty.JPG",
        "/images/getty-2.JPG",
        "/images/getty-3.JPG",
        "/images/getty-4.JPG",
        "/images/getty-5.JPG",
        "/images/getty-6.JPG",
      ]
    },
    {
      id: "ktown",
      name: "K-Town",
      slug: "ktown",
      coverImage: "/images/ktown/ktown.JPG",
      description: "Korean town adventures and experiences",
      images: [
        "/images/ktown.JPG",
        "/images/ktown-2.JPG",
        "/images/ktown-3.JPG",
        "/images/ktown-4.JPG",
        "/images/ktown-5.JPG",
        "/images/ktown-6.JPG",
      ]
    },
    {
      id: "bay",
      name: "Bay",
      slug: "bay",
      coverImage: "/images/SJ/leigh.JPG",
      description: "Bay area explorations and scenic views",
      images: [
        "/images/leigh.JPG",
        "/images/bay-2.JPG",
        "/images/bay-3.JPG",
        "/images/bay-4.JPG",
        "/images/bay-5.JPG",
        "/images/bay-6.JPG",
      ]
    },
    {
      id: "sf",
      name: "SF 3/25/25",
      slug: "sf",
      coverImage: "/images/SF/SF.JPG",
      description: "Ellie and Maggie went on a date and Yang third wheeled. Some of my favorite photos are from this trip, just look at our photos we took together on the pier (and look at my diabolical side eye to Maggie). Also, look at Ellie's face when she dropped the bear into the drink LOL. ",
      images: [
        "/images/SF/SF.JPG",
        "/images/SF/sf1.JPG",
        "/images/SF/sf2.JPG",
        "/images/SF/sf3.JPG",
        "/images/SF/sf4.JPG",
        "/images/SF/sf5.JPG",
        "/images/SF/sf6.JPG",
        "/images/SF/sf7.JPG",
        "/images/SF/sf8.JPG",
        "/images/SF/sf9.JPG",
        "/images/SF/sf10.JPG",
        "/images/SF/sf11.JPG",
        "/images/SF/sf12.JPG",
        "/images/SF/sf13.JPG",
        "/images/SF/sf14.JPG",
        "/images/SF/sf15.JPG",
        "/images/SF/sf16.JPG",
        "/images/SF/sf17.JPG",
        "/images/SF/sf18.JPG",
        "/images/SF/sf19.JPG",
        "/images/SF/sf20.JPG",
        "/images/SF/sf21.JPG",
        "/images/SF/sf22.JPG",
        "/images/SF/sf23.JPG",
        "/images/SF/sf24.JPG",
        "/images/SF/sf25.JPG",
        "/images/SF/sf26.JPG",
        "/images/SF/sf27.JPG",
        "/images/SF/sf28.JPG",
      ]
    },
  ];
  
  // Helper functions
  export const getGalleryBySlug = (slug: string): GalleryItem | undefined => {
    return galleryData.find(item => item.slug === slug);
  };
  
  export const getAllGallerySlugs = (): string[] => {
    return galleryData.map(item => item.slug);
  };