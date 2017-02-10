# import the necessary packages
import numpy as np
import urllib
import json
import cv2
import os

# define the path to the face detector
FACE_DETECTOR_PATH = "{base_path}/cascades/cascade.xml".format(
	base_path=os.path.abspath(os.path.dirname(__file__)))

def detect(file):
	print("========detecting......=======")
	image = _grab_image(stream=file)
	image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	detector = cv2.CascadeClassifier(FACE_DETECTOR_PATH)
	print("...................")
	rects = detector.detectMultiScale(image, scaleFactor=1.3, minNeighbors=10,
		minSize=(75, 75), flags=cv2.cv.CV_HAAR_SCALE_IMAGE)
	print("========Finishing=========")
	rects = [(int(x), int(y), int(w), int(h)) for (x, y, w, h) in rects]
	print(rects)
	return rects

def _grab_image(path=None, stream=None, url=None):
	# if the path is not None, then load the image from disk
	if path is not None:
		image = cv2.imread(path)

	# otherwise, the image does not reside on disk
	else:
		# if the URL is not None, then download the image
		if url is not None:
			resp = urllib.urlopen(url)
			data = resp.read()

			# if the stream is not None, then the image has been uploaded
		elif stream is not None:
			data = stream.read()

			# convert the image to a NumPy array and then read it into
			# OpenCV format
			image = np.asarray(bytearray(data), dtype="uint8")
			image = cv2.imdecode(image, cv2.IMREAD_COLOR)

	# return the image
	return image
