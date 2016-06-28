# -*- coding: utf-8 -*- 
import tornado.web , time 
import json
import base64
import requests
import hashlib
from  base import BaseHandler

class Base_Handler(BaseHandler):
    def get(self):
	self.render("base.html")
