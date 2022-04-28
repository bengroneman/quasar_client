#!/usr/bin/bash

npm run build

sudo rm -rf /var/www/quasar/quasar_client/build && rm -rf /var/www/qusar/quasar_client/.svelte-kit

sudo cp -r ./build /var/www/quasar/quasar_client/ && cp -r ./.svelte-kit /var/www/quasar/quasar_client/

