from src import *


def fooWithReturn(*args, **kwargs):
    fooArgsNoReturn(*args, **kwargs)
    return args, kwargs
