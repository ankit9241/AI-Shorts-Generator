# Backend Fixes Summary

Here is a comprehensive summary of all the bugs identified and fixed across the backend codebase (`ai-podcast-clipper-backend`) to make the pipeline run successfully on Modal.

## 1. Environment & Dependencies (`requirements.txt` & `main.py`)

- **WhisperX / Pyannote Compatibility**: 
  - *Issue*: `AttributeError: 'Function' object has no attribute 'web_url'` (related to torchaudio metadata in older pyannote-audio).
  - *Fix*: Upgraded and pinned `whisperx>=3.8.0` in `requirements.txt` to automatically fetch modern `pyannote-audio>=4.0.0`, resolving the torchaudio dependency bug.
- **PySceneDetect Legacy API Removed**:
  - *Issue*: The `Columbia_test.py` script crashed because it used `VideoManager`, `SceneManager`, etc., which were completely removed in `scenedetect` v0.6+.
  - *Fix*: Pinned `scenedetect==0.5.6.1` in `requirements.txt` to restore compatibility for the Active Speaker Detection (ASD) models.
- **Modal Base Image Build Issues**:
  - *Issue*: Container failed to build native C-extensions like `av` or `onnxruntime`.
  - *Fix*: Added a step in `main.py`'s image definition to upgrade `pip`, `setuptools`, and `wheel` (`pip install --upgrade pip setuptools wheel`).
- **S3 Bucket Name**:
  - *Issue*: The script was pointing to an incorrect default bucket.
  - *Fix*: Updated the target S3 bucket everywhere in `main.py` to `hack-n-tech-3.0-ai-shorts-generator`.

## 2. Missing Pre-trained Models (`main.py` & `s3fd/__init__.py`)

- **Missing S3FD Face Detector Weights**:
  - *Issue*: The `sfd_face.pth` model weight (25MB) is not included in the git repo. The code was using `gdown` at runtime to download it, but due to Modal's working directory (`/`), it downloaded it to the wrong path causing a `FileNotFoundError` during inference.
  - *Fix*: Added the `gdown` command directly into the **Modal Image definition** (`main.py`) so the model is baked into the container at `/asd/model/faceDetector/s3fd/sfd_face.pth` during the build phase.
- **Outdated `gdown` Syntax**:
  - *Issue*: `gdown --id <id>` crashed because newer versions of `gdown` removed the `--id` flag.
  - *Fix*: Updated `gdown <id>` syntax in `main.py`, `s3fd/__init__.py`, and `utils/tools.py`.

## 3. PyTorch & NumPy Deprecations (`ASD.py` & `box_utils.py`)

- **PyTorch 2.6+ `torch.load` Security Changes**:
  - *Issue*: Newer PyTorch versions default to `weights_only=True` for security, which breaks loading older `.pth` files containing non-tensor objects.
  - *Fix*: Added `weights_only=False` to all `torch.load` calls in:
    - `asd/model/faceDetector/s3fd/__init__.py`
    - `asd/ASD.py`
- **NumPy 2.0+ Removed Aliases**:
  - *Issue*: `np.int` and `np.float` were deprecated in NumPy 1.20 and entirely removed in NumPy 2.0, causing `AttributeError: module 'numpy' has no attribute 'int'`.
  - *Fix*: Replaced `np.int` with the standard Python `int` in `asd/model/faceDetector/s3fd/box_utils.py`.
  - *Fix*: Replaced `np.float` with the standard Python `float` in `asd/utils/get_ava_active_speaker_performance.py`.

## 4. Error Handling & Subprocess Visibility (`main.py`)

- **Silent Subprocess Failures**:
  - *Issue*: `Columbia_test.py` and `ffmpeg` were failing silently because `subprocess.run()` was called without `check=True`. This caused downstream functions to crash with confusing errors like `FileNotFoundError: Tracks or scores not found`.
  - *Fix*: Added `capture_output=True, text=True` and explicit return code checks to print out the real `stderr` from `ffmpeg` and `Columbia_test.py` whenever they fail.
- **WhisperX Transcript Edge Cases**:
  - *Issue*: Sometimes WhisperX outputs unaligned words without `start` and `end` timestamps, which caused a `KeyError` when looping over `word_segments`.
  - *Fix*: Added `.get("word")` and a condition to skip words missing timestamps to ensure the json transcription logic is resilient.
- **Modal Web Endpoint Change**:
  - *Issue*: `AiPodcastClipper.process_video.web_url` is deprecated.
  - *Fix*: Updated to `get_web_url()` per Modal's latest SDK.
