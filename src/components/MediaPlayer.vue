<script setup lang="ts">
import CheckboxVue from "@/components/ui/checkbox/checkbox.vue";
import audioBg from "@/assets/img/bradley-avatar.png";
import { computed, onMounted, ref, watch } from "vue";
import * as Plyr from "plyr";
import "plyr/dist/plyr.css";
import type { TrackSchema } from "@/content/schemas";

type TrackWithId = TrackSchema & { id: number };

const props = defineProps<{
  playlist: TrackWithId[];
}>();
const playerElement = ref<HTMLElement | null>(null);
const playerInstance = ref<Plyr | null>(null);
const currentTrackId = ref(0);
const videoSelected = ref(true);
const audioSelected = ref(true);

onMounted(() => {
  if (playerElement.value) {
    playerInstance.value = new Plyr.default(playerElement.value, {
      controls: ["play", "progress", "current-time", "mute"],
    });
  }
});

const tracks = computed<TrackWithId[]>(() => {
  return props.playlist.filter((track) => {
    if (track.type === "youtube") {
      return videoSelected.value;
    } else if (track.type === "audio") {
      return audioSelected.value;
    }
    return false;
  });
});

const playTrack = (trackId: number) => {
  currentTrackId.value = trackId;
  const track = props.playlist.find((t) => t.id === trackId);

  if (track && playerInstance.value) {
    playerInstance.value.source = {
      type: track.type === "youtube" ? "video" : "audio",
      sources: [
        {
          src: track.url,
          provider: track.type === "youtube" ? "youtube" : undefined,
          type: track.type === "audio" ? "audio/mp4" : undefined,
        },
      ],
    };
    playerInstance.value.play();
  }
};
</script>

<template>
  <div
    class="grid md:grid-cols-2 lg:grid-cols-[5fr_3fr] gap-8 lg:gap-16 items-start"
  >
    <div
      :style="{
        backgroundImage: 'url(/assets/img/soundwave.png)',
        backgroundSize: 'cover',
      }"
      :class="{
        'w-full rounded-xl sticky top-16 md:top-24 lg:top-52 aspect-video grid items-center bg-neutral-900 z-10': true,
        // 'top-60':
        //   props.playlists[currentListIndex].tracks[currentTrackIndex].type ===
        //   'audio',
      }"
    >
      <div
        ref="playerElement"
        id="player"
        data-plyr-provider="youtube"
        :data-plyr-embed-id="props.playlist[0]?.url"
      ></div>
    </div>
    <div class="space-y-8">
      <h2 class="text-3xl">Tracks</h2>
      <div class="flex gap-4">
        <label class="flex items-center gap-2" for="select-video">
          <CheckboxVue id="select-video" v-model="videoSelected" />
          <span>Video</span>
        </label>
        <label class="flex items-center gap-2" for="select-audio">
          <CheckboxVue id="select-audio" v-model="audioSelected" />
          <span>Audio</span>
        </label>
      </div>
      <ul class="flex flex-col gap-2">
        <li
          v-for="track in tracks"
          :key="track.url"
          :class="{
            'flex flex-col p-2 rounded-xl transition-colors duration-150': true,
            'cursor-pointer hover:bg-neutral-600': track.id !== currentTrackId,
            'bg-muted': track.id === currentTrackId,
          }"
          role="button"
          tabindex="0"
          @keydown.enter="
            track.id === currentTrackId ? null : playTrack(track.id)
          "
          @keydown.space="
            track.id === currentTrackId ? null : playTrack(track.id)
          "
          @click="track.id === currentTrackId ? null : playTrack(track.id)"
        >
          <span class="uppercase text-xs text-muted-foreground">{{
            track.composer
          }}</span>
          <span class="text-base">
            {{ track.title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
:deep(.plyr) {
  /* Accent / highlight color */
  --plyr-color-main: #3b82f6;
  --plyr-focus-visible-color: #3b82f6;
  --plyr-control-toggle-checked-background: #3b82f6;

  /* Range (seek bar) */
  --plyr-range-fill-background: #3b82f6;
  --plyr-range-thumb-background: #f4f4f5;
  --plyr-range-thumb-shadow: 0 1px 1px #0000004d, 0 0 0 1px #3b82f633;
  --plyr-range-thumb-active-shadow-width: 3px;
  --plyr-range-track-height: 4px;
  --plyr-range-thumb-height: 14px;

  /* Audio player controls */
  --plyr-audio-controls-background: #18181b;
  --plyr-audio-control-color: #a1a1aa;
  --plyr-audio-control-color-hover: #f4f4f5;
  --plyr-audio-control-background-hover: #3f3f46;
  --plyr-audio-range-track-background: #3f3f46;
  --plyr-audio-range-thumb-active-shadow-color: #3b82f633;
  --plyr-audio-progress-buffered-background: #52525b;

  /* Video player controls */
  --plyr-video-background: #09090b;
  --plyr-video-controls-background: linear-gradient(#0000, #000000cc);
  --plyr-video-control-color: #d4d4d8;
  --plyr-video-control-color-hover: #ffffff;
  --plyr-video-control-background-hover: #3b82f633;
  --plyr-video-range-track-background: #ffffff33;
  --plyr-video-progress-buffered-background: #ffffff33;

  /* Progress loading */
  --plyr-progress-loading-background: #3f3f46;

  /* Tooltip */
  --plyr-tooltip-background: #27272a;
  --plyr-tooltip-color: #f4f4f5;
  --plyr-tooltip-shadow: 0 2px 8px #00000066;
  --plyr-tooltip-radius: 6px;

  /* Menu */
  --plyr-menu-background: #27272a;
  --plyr-menu-color: #f4f4f5;
  --plyr-menu-shadow: 0 4px 16px #00000066;
  --plyr-menu-radius: 8px;
  --plyr-menu-arrow-color: #3f3f46;
  --plyr-menu-back-border-color: #3f3f46;
  --plyr-menu-back-border-shadow-color: #18181b;

  /* Badge */
  --plyr-badge-background: #3f3f46;
  --plyr-badge-text-color: #f4f4f5;

  /* Progress marker */
  --plyr-progress-marker-background: #f4f4f5;
}
</style>
