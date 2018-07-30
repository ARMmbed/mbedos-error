## Mbed OS Error Microsite

Go to [https://ArmMbed.github.io/mbedos-error](https://ArmMbed.github.io/mbedos-error)

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
