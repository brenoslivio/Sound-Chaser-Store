import json
import base64

# Just a script to convert original images in the db to base64

def convert_image_to_base64(image_path):
    with open(image_path, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return 'data:image/png;base64,' + encoded_string

def convert_album_images_to_base64(data):
    for album in data['albums']:
        image_path = album['img']
        base64_image = convert_image_to_base64(image_path)
        album['img'] = base64_image

def main():
    with open('backup.json') as json_file:
        data = json.load(json_file)
    convert_album_images_to_base64(data)
    with open('output.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

if __name__ == '__main__':
    main()