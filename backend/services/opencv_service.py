import cv2
import mediapipe as mp

def eye_recognition():
    eye_cascade = cv2.CascadeClassifier("../haaracascade_eye_tree_eyeglasses.xml")
    cap = cv2.VideoCapture('test.mp4')


    while cap.isOpened():
        _, img = cap.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        eyes = eye_cascade.detectMultiScale(gray, 1.1, 4)

        for (x, y, w, h) in eyes:
            cv2.rectangle(img, (x, y), (x+w, y+h), (111, 135, 201), 4)
            #roi_gray = gray[y:y+h, x:x+w]
            #roi_colour = gray[y:y+h, x:x+w]

        cv2.imshow('img', img)
        if cv2.waitKey(1) and 0xFF == ord('q'):
            break

    cap.release()

def get_landmarks(image):
    mp_drawing = mp.solutions.drawing_utils
    mp_face_mesh = mp.solutions.face_mesh
    drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)

    face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5, max_num_faces=1)
    image.flags.writeable = False
    results = face_mesh.process(image)
    landmarks = results.multi_face_landmarks[0].landmark

    for face in landmarks:
        for landmark in face.landmark:
            x = landmark.x
            y = landmark.y

            shape = image.shape 
            relative_x = int(x * shape[1])
            relative_y = int(y * shape[0])

    # Draw landmarks
    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            print('face landmarks', face_landmarks)
            mp_drawing.draw_landmarks(
                image=image,
                landmark_list=face_landmarks,
                connections=mp_face_mesh.FACE_CONNECTIONS,
                landmark_drawing_spec=drawing_spec,
                connection_drawing_spec=drawing_spec)
        cv2.imshow('MediaPipe FaceMesh', image)

    return landmarks, results
