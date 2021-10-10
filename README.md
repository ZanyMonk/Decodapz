# Decodapz

## @TODO
- [ ] Add options for each encoder
  - [x] `Hex`
    - [x] Allow separator selection
    - [x] Allow prefix selection
  - [ ] `Base64`
    - [ ] Generalize in `BaseN`
    - [ ] Allow charset selection from predefined charsets
      - [ ] Standard
      - [ ] URL-safe
      - [ ] All (bruteforce)
      - [ ] Research for more ...
    - [ ] Allow custom charset (String or RegExp)
- [ ] Add encoders
  - [ ] `RotX`
  - [x] `URL`
  - [x] `XOR`
- [ ] Add insights about current decoded data
  - [x] Length in characters
  - [x] Length in bytes
  - [x] Length in words (spaces)
  - [ ] CRC32
  - [ ] Hashes
    - [ ] MD5
    - [x] SHA-1
    - [x] SHA-256
    - [x] SHA-512