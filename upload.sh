#!/bin/bash

rsync -av ./ cpanel:/home/cagekzzn/public_html --update --progress --exclude .git/
