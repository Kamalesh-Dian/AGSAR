# AGSAR site: image and video prompts

Generate these, then drop the files into `public/media/` using the exact file names below.
The site works without them (illustrated fallbacks show instead), so you can add them one at a time.

**Shared look for every image** (paste at the end of each prompt for a consistent set):
> Cinematic golden-hour photograph, deep navy shadows with warm amber-orange sky glow and copper highlights, subtle film grain, shallow haze, wide dynamic range, no text, no logos, no watermarks, no close-up faces.

---

## Sector images (portrait, 4:5, about 1600 x 2000, JPG)

| File | Prompt |
|---|---|
| `sector-solar.jpg` | Aerial view of rows of solar panels on a large utility-scale plant at sunset, long shadows, panels reflecting orange sky, a small inverter station and a service road leading into the distance. |
| `sector-bess.jpg` | Row of white containerised battery energy storage units beside a transformer yard at dusk, cable trays and bright warm work lights, clean gravel ground, a few small figures in safety gear far in the background. |
| `sector-wind.jpg` | Low angle view of three large wind turbines on a ridge against a glowing dusk sky, blades slightly motion-blurred, dry grass in the foreground, a pooling substation faintly visible on the plain below. |
| `sector-ht.jpg` | Medium-voltage switchyard at twilight: outdoor transformer, steel gantry structures and insulators with warm light on metal, neat gravel and earthing details, no people close to camera. |
| `sector-eht.jpg` | Extra-high-voltage substation at blue hour, tall steel gantries and lattice transmission towers, long rows of insulator strings catching amber light, converging power lines against the sky. |
| `sector-pumps.jpg` | Industrial pump house interior with large electric motors and pump sets on concrete plinths, painted pipework in blue and copper tones, warm light through a high window, slight steam haze. |

## Site reel (video, 16:9, 1920 x 1080, MP4, 8 to 10 seconds, loops)

**File:** `public/media/site-reel.mp4`

> Slow continuous drone shot gliding forward over a solar plant at golden hour, rows of panels flashing with sunlight, wind turbines turning gently on the horizon, a substation with transmission towers coming into view at the end. Smooth stabilised motion, cinematic colour grade with deep navy shadows and amber highlights, no text, no logos, no people close to camera. Seamless loop if possible.

Also export one frame as `site-reel-poster.jpg` (1920 x 1080): this shows while the video loads.

## Social share image (landscape, 1200 x 630, JPG)

**File:** `public/media/og-image.jpg`

> Wide cinematic dusk scene with silhouetted wind turbines and a solar field in the foreground, warm amber horizon fading to deep navy sky, empty space in the upper left for a logo, no text.

---

### Tips
- Keep images under about 400 KB each (use Squoosh or TinyPNG) so the carousel stays fast.
- Keep the video under about 6 MB, no audio track.
- Same camera height and colour grade across the six sector images makes the carousel feel like one set.
