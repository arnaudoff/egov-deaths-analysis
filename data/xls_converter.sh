#!/bin/bash

# Usage: ./converter.sh <file> <dir>
# Converts the XLS formatted file <file> to a CSV formatted file placed in <dir>

FILE_NAME=$1
OUT_DIR=$2

# For reference: https://ask.libreoffice.org/en/question/144942/how-to-convert-to-csv-with-utf-8-encoding-using-lo5-command-line/
libreoffice --headless --convert-to csv:"Text - txt - csv (StarCalc)":44,34,76 $FILE_NAME --outdir $OUT_DIR
