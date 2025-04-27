# Import the patch first
import fix_torch_load

from ai4bharat.transliteration import XlitEngine

e = XlitEngine("hi", beam_width=10, rescore=True)
out = e.translit_word("namasthe", topk=5)
print(out)
# output: {'hi': ['नमस्ते', 'नमस्थे', 'नामस्थे', 'नमास्थे', 'नमस्थें']}