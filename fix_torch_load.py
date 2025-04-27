import torch
from torch import serialization
import argparse

# Add argparse.Namespace to safe globals
serialization.add_safe_globals([argparse.Namespace])

# Store the original torch.load function
original_torch_load = torch.load

# Create a patched version of torch.load that sets weights_only=False by default
def patched_torch_load(*args, **kwargs):
    if 'weights_only' not in kwargs:
        kwargs['weights_only'] = False
    return original_torch_load(*args, **kwargs)

# Replace the original torch.load with our patched version
torch.load = patched_torch_load

print("Torch load patched successfully to use weights_only=False") 