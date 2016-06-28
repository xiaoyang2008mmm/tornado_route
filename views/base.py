# -*- coding: utf-8 -*- 
import tornado.web 
import urllib

class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
       return self.application.db



    def archivemgr_path(self):
	archivemgr= "/root/d/src/uarchivemgr-linux64"

	return  archivemgr

    def tmp_video_path(self):
	tmp_video_path = "/tmp/ucloud/download/"
	
	return tmp_video_path



    def set_default_headers(self):
        self.clear_header('测试七味都气丸')



class AdminBaseHandler(BaseHandler):                                                                                                                  
                                                                                                                                                      
    def prepare(self):                                                                                                                                
        if not self.current_user:                                                                                                                     
            url = self.get_login_url()                                                                                                                
            if "?" not in url:                                                                                                                        
                url += "?" + urllib.urlencode(dict(next=self.request.full_url()))                                                                     
            self.redirect(url)                                                                                                                        
        elif self.current_user.group != 9:                                                                                                            
            self.redirect("/")                                                                                                                        
                                                                                                                                                      
        super(AdminBaseHandler, self).prepare()                                                                                                       
                                                                                                                                                      
class UserBaseHandler(BaseHandler):                                                                                                                   
                                                                                                                                                      
    def prepare(self):                                                                                                                                
        if not self.current_user:                                                                                                                     
            url = self.get_login_url()                                                                                                                
            if "?" not in url:                                                                                                                        
                url += "?" + urllib.urlencode(dict(next=self.request.full_url()))                                                                     
            self.redirect(url)                                                                                                                        
                                                                                                                                                      
        super(UserBaseHandler, self).prepare()
