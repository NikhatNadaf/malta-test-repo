'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { X } from 'lucide-react';

export default function ProductImages({ service }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);

    if (!service?.images?.length) return null;
    const parsedImages = service.images.map((img) => JSON.parse(img));

    const handleImageClick = (index) => {
        setInitialSlide(index);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setThumbsSwiper(null); // reset thumbs swiper on close
    };

    return (
        <div>
            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                {parsedImages.map((image, index) => {
                    if (index === 0) {
                        return (
                            <div
                                key={index}
                                onClick={() => handleImageClick(index)}
                                className="md:col-span-2 relative group overflow-hidden rounded-2xl h-full cursor-pointer"
                            >
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-[300px] sm:h-[350px] md:h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        );
                    }

                    if (index === 1) {
                        return (
                            <div
                                key={index}
                                onClick={() => handleImageClick(index)}
                                className="relative group overflow-hidden rounded-2xl cursor-pointer"
                            >
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        );
                    }

                    if (index === 2) {
                        return (
                            <div
                                key={`right-images-${index}`}
                                className="grid grid-rows-2 gap-3 md:gap-4 h-full"
                            >
                                {[2, 3].map((i) => {
                                    const img = parsedImages[i];
                                    if (!img) return null;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => handleImageClick(i)}
                                            className="relative group overflow-hidden rounded-2xl cursor-pointer"
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.name}
                                                className="w-full h-[140px] sm:h-[165px] md:h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }

                    return null;
                })}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-transparent rounded-xl p-4 w-full mx-4"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute w-10 h-10 cursor-pointer top-2 right-3 text-white border rounded-full text-5xl z-10 flex items-center justify-center"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <Swiper
                            initialSlide={initialSlide}
                            spaceBetween={10}
                            navigation
                            mousewheel={true}
                            slidesPerView={1}
                            keyboard={{ enabled: true }}
                            modules={[Navigation, Thumbs, Mousewheel, Keyboard]}
                            thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
                            className="mb-3"
                            onSwiper={setMainSwiper}
                            onSlideChange={(swiper) => setInitialSlide(swiper.realIndex)}
                        >
                            {parsedImages.map((img, i) => (
                                <SwiperSlide key={img.url || i}>
                                    <img
                                        src={img.url}
                                        alt={img.name}
                                        className="max-h-[70vh] w-fit mx-auto object-contain rounded-xl"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={5}
                            slidesPerView={Math.min(5, parsedImages.length)}
                            watchSlidesProgress
                            modules={[Thumbs]}
                            className="pt-4"
                            slideToClickedSlide={true}
                        >
                            {parsedImages.map((img, i) => (
                                <SwiperSlide
                                    key={img.url || i}
                                    className={`cursor-pointer max-w-[20vw] border-2 rounded-xl overflow-hidden ${i === initialSlide ? 'border-2 border-red-600' : ''}`}
                                    onClick={() => {
                                        if (mainSwiper) {
                                            mainSwiper.slideTo(i);
                                        }
                                    }}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.name}
                                        className="max-h-[25vh] w-full object-cover transition"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            )}
        </div>
    );
}
