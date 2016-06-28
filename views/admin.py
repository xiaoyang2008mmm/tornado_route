# -*- coding: utf-8 -*- 

from  base import BaseHandler, AdminBaseHandler ,UserBaseHandler
from lib.route import route
@route(r'/admin', name='admin_index') 
class IndexHandler(BaseHandler):

    def get(self):
	print self.request.full_url()
        self.render('admin/index.html')
