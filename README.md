# Apocalypse-2024

Code for web dashboard of dual defense system in a zombe apopcalypse.

![image of dashboard](https://github.com/JaehyeongPark06/Apocalypse-2024/assets/78674944/226c4ba3-fcbd-4f0d-b69c-678d0a56d1da)

- Scrapes content from webpages created by two esp 32s continuously

- Webpage 1: Turns temperature and humidity into a graph and checks if zombie was captured (updates every second for temperature and humidity, every second for zombie if zombie not captured, if zombie captured, checks again in 20 seconds)

- Webpage 2: Retrieves angle and distance and plots it on a point in a semicircle (updates every second for all 3)
