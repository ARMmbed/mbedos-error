## DAPLink interface firmware update microsite

<!-- [![Build Status](https://travis-ci.org/ARMmbed/mbedos-error.svg?branch=gh-pages)](https://travis-ci.org/ARMmbed/mbedos-error) -->

Go to [https://blackstoneengineering.github.io/mbedos-error](https://blackstoneengineering.github.io/mbedos-error)

The purpose of this microsite is
1. parse mbed OS error messages in a user friendly way
2. provide analytics / tracking on most common erros 

### How to use
You can either pass in the error code as a hex or as a individual param string

```
?type=X&module_type=Y&error_code=Z
```
in the above case X,Y,Z are expected to be numbers 

```
?error=0x8______
```
in the above case you just pass in the hex error code


### Updating the microsite content
Change the contents of _data/error.yml to reflect updates to error codes.

### Future Updates
- Add google analytics integration to track errors over time to see spikes / decide which errors need more in depth suggested fixes
- add suggested fixes section for common errors
- add params for mbed-os lib revision and compiliation unique codes to prevent one user multi-clicking from skewing the results

## Known bugs
- Search Box doesnt work
- UI is ugly / needs cleanup