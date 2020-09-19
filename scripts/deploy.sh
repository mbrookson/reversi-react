echo Building...

npm run build

echo Deploying...

aws s3 cp ./build/ s3://reversi.mbrookson.uk/ --recursive
