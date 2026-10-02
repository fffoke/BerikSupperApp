# Demo market images

The curated market images in `categories/` and the `.avif` files in `products/` were collected from public [Yandex Lavka](https://lavka.yandex.ru/) catalogue pages on 2026-10-01. The exact source URL for every file is recorded in [`../scripts/lavka_media_sources.json`](../scripts/lavka_media_sources.json). The three older PNG/JPEG product files have separate source notes in [`products/README.md`](products/README.md).

The backend stores local `/static/...` paths in `categories.image_url` and `products.image_url`. `docker compose up` copies bundled static files into the existing named volume and seeds the small demo catalogue. Set `SEED_DEMO_CATALOG=0` to skip demo seeding in a real deployment.

This is a fixed development sample, not a live Lavka catalogue. Prices, discounts and availability can change; fields such as nutrition are not imported. Check the rights to Lavka imagery before redistributing it commercially.
