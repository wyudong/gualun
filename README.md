# gualun

## Client

```
yarn dev         # console 1
frpc -c frpc.ini # console 2
```

## Server

/etc/systemd/system/frps.service
```
[Unit]
Description=Frp Server Service
After=network.target

[Service]
Type=simple
User=root
Restart=on-failure
RestartSec=5s
ExecStart=/root/frps/frps -c /root/frps/frps.ini

[Install]
WantedBy=multi-user.target
```

Caddyfile
```
gualun.xyz
encode gzip
reverse_proxy :8080
```

/etc/systemd/system/caddy.service
```
[Unit]
Description=Caddy
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
User=root
Restart=on-failure
RestartSec=5s
ExecStart=/usr/bin/caddy run --environ --config /root/Caddyfile
ExecReload=/usr/bin/caddy reload --config /root/Caddyfile

[Install]
WantedBy=multi-user.target
```

Start service:

```
systemctl daemon-reload
systemctl enable frp
systemctl enable caddy
systemctl start frp
systemctl start caddy
```
