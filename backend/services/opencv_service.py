import cv2

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