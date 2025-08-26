import assemblyai as aai

aai.settings.api_key = "ade07cb488854d4e8a8922447fa2ccf9"

# audio_file = "./local_file.mp3"
audio_file = "https://assembly.ai/wildfires.mp3"

config = aai.TranscriptionConfig(speech_model=aai.SpeechModel.best)

transcript = aai.Transcriber(config=config).transcribe(audio_file)

if transcript.status == "error":
  raise RuntimeError(f"Transcription failed: {transcript.error}")

print(transcript.text)