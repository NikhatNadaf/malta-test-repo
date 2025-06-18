import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  //   .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          navbar: {
            explore:"explore",
            events:"events",
            askUs:"ask us",
            login:"login",
            signup:"sign up",
          },
          home:{
            title:"Discover Malta’s Best Experiences",
            subTitle:"From tours and adventures to dining and relaxation, find everything you need for the perfect trip to Malta—all in one place.",
            placeholder:"Find everything you need...",
            banner:{
                title:"New way to start your tour",
                subTitle:" Customize your trip based on what you love. Whether you’re an adventure-seeker, a foodie, or a culture enthusiast, we’ll help you craft the perfect experience.",
                button:"START"
            },
            places:{
              count:"2,000+",
              text:"Unique Places"
            },
            recommendPlaces:"Recommed Places",
            learnMore:"Learn More",
            events:"Upcoming Events",

            discover:{
              title:"Top Picks for Your Maltese Adventure",
              subTitle:"Start with our most popular experiences and tours — perfect for getting the most out of Malta."
            },
            custom:{
              title:"Don’t know where to start?",
              subTitle:"Customize your trip based on what you love. Whether you’re an adventure-seeker, a foodie, or a culture enthusiast, we’ll help you craft the perfect experience."
            }
            
          },
        },
      },
    },
  });

export default i18n;
