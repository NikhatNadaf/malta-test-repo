"use client";

import { useVideo } from "@/features/getMaltaxploreVideo";
import React from "react";

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";

export function HeroVideoDialogDemo({ path }) {
  const { data: videoUrl, isLoading, isError } = useVideo(path);
  if (isLoading || isError || !videoUrl) return null;
  console.log("videoUrl", videoUrl);
  return (
    <div className="relative col-span-2 max-lg:col-span-3">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc={path}
        thumbnailSrc="/malta-thumbnail.jpg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}

export function Iphone15ProDemo({ path }) {
  const { data: videoUrl, isLoading, isError } = useVideo(path);
  if (isLoading || isError || !videoUrl) return null;
  // return <Iphone15Pro className="size-full" videoSrc={videoUrl} />;
  return (
    <video
      className="size-full overflow-hidden rounded-[50px] object-cover border-[10px] border-[#fee2e1]"
      src={videoUrl}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
