"""Regenerate the public X-ray input/generated comparison with visible row labels."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSET = ROOT / "experience" / "assets" / "results" / "project-03" / "task2_input_generated_comparison.png"


def font(size: int):
    for candidate in ("C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/segoeuib.ttf"):
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def main():
    source = Image.open(ASSET).convert("RGB")
    # The saved reference figure contains input, reconstruction and generated rows.
    # This comparison intentionally keeps only the two rows named in its title.
    x0, x1 = 14, source.width - 14
    rows = [source.crop((x0, 122, x1, 356)), source.crop((x0, 592, x1, 828))]
    # Leave enough room for the complete two-line label.  The earlier 320 px
    # column allowed the long second line to extend beyond the canvas edge.
    left = 500
    top = 112
    gap = 32
    canvas = Image.new("RGB", (left + rows[0].width, top + sum(row.height for row in rows) + gap + 26), "white")
    canvas.paste(rows[0], (left, top))
    canvas.paste(rows[1], (left, top + rows[0].height + gap))

    draw = ImageDraw.Draw(canvas)
    title_font = font(42)
    label_font = font(30)
    draw.text((left + rows[0].width // 2, 30), "Input vs Generated Output", fill="black", anchor="mm", font=title_font)
    labels = [
        ("INPUT", "REAL CHEST X-RAY", (32, 115, 130)),
        ("GENERATED OUTPUT", "LATENT SAMPLE", (169, 101, 45)),
    ]
    for index, (line_one, line_two, color) in enumerate(labels):
        center_y = top + rows[0].height // 2 + index * (rows[0].height + gap)
        draw.rounded_rectangle((22, center_y - 55, left - 22, center_y + 55), radius=14, fill=(245, 249, 250), outline=color, width=4)
        draw.multiline_text((left // 2, center_y - 6), f"{line_one}\n{line_two}", fill=color, anchor="mm", align="center", spacing=5, font=label_font)

    canvas.save(ASSET, optimize=True)
    print(f"saved {ASSET} {canvas.size}")


if __name__ == "__main__":
    main()
