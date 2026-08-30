<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Host subdomain per event
    |--------------------------------------------------------------------------
    |
    | Kalau diisi (mis. "racikevent.com"), setiap event terbit bisa diakses di
    | https://<slug>.racikevent.com. Rute subdomain HANYA didaftarkan ketika
    | nilai ini ada, jadi selama kosong tidak ada perubahan perilaku apa pun.
    |
    | Mengaktifkannya butuh DNS wildcard (*.domain) yang diarahkan ke server —
    | itu urusan registrar/hosting, bukan kode. Selama belum ada, event tetap
    | diakses lewat path /e/{slug} yang sudah berjalan.
    |
    */

    'subdomain_host' => env('EVENT_SUBDOMAIN_HOST'),

];
