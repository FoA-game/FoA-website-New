import os
from PIL import Image

def convert_images_to_webp(source_folder):
    """
    遍历source_folder及其所有子文件夹，将找到的所有图片文件（png, jpeg, jpg）转换为webp格式。
    转换后的文件将保持原有的分辨率和文件名（除了扩展名）。
    """
    for root, dirs, files in os.walk(source_folder):
        for file in files:
            if file.lower().endswith(('.png', '.jpeg', '.jpg')):
                # 构建完整的文件路径
                full_file_path = os.path.join(root, file)
                # 构建目标文件的完整路径，将原扩展名替换为.webp
                target_file_path = os.path.splitext(full_file_path)[0] + '.webp'
                
                # 打开原图像文件
                with Image.open(full_file_path) as img:
                    # 保存为webp格式
                    img.save(target_file_path, 'WEBP')
                
                print(f'Converted {full_file_path} to {target_file_path}')

# 指定您的源文件夹路径
source_folder = 'images'
convert_images_to_webp(source_folder)
os.system('pause')