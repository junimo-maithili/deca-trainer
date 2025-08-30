import google.generativeai as genai

def evaluate_roleplay(transcript, judge_prompt):
    
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt=f"""You are a DECA judge evaluating a roleplay. The participant is presenting a business solution in a limited time.
        Rate the participant in the following areas (1–5): 
        - Problem identification 
        - Creativity of solution 
        - Communication and professionalism 
        - Use of data/facts
        Provide a short explanation for each rating.
        Here is the paper with the scenario that the participant receives. It also includes your judge characterization: {judge_prompt}
        Transcript: {transcript}
        """

        response = model.generate_content(prompt)
        return response.text
    
    except Exception as e:
        return f"Error: {str(e)}"