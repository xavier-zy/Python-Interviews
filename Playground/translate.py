import http.client
import hashlib
import urllib
import random
import json

appid = '20191021000342997'  # 填写你的appid
secretKey = 'WeRJ6eujtgeXPLV0KhpP'  # 填写你的密钥

httpClient = None

fromLang = 'auto'  # 原文语种
toLang = 'zh'  # 译文语种


def teest():
	return "Hello"


def translate(word):
	global httpClient
	salt = random.randint(32768, 65536)
	q = word
	sign = appid + q + str(salt) + secretKey
	sign = hashlib.md5(sign.encode()).hexdigest()
	url = '/api/trans/vip/translate'
	url = url + '?appid=' + appid + '&q=' + urllib.parse.quote(
		q) + '&from=' + fromLang + '&to=' + toLang + '&salt=' + str(
		salt) + '&sign=' + sign
	try:
		httpClient = http.client.HTTPConnection('api.fanyi.baidu.com')
		httpClient.request('GET', url)
		
		# response是HTTPResponse对象
		response = httpClient.getresponse()
		result_all = response.read().decode("utf-8")
		result = json.loads(result_all)
		
		return (result['trans_result'][0])
	
	except Exception as e:
		return (e)
	finally:
		if httpClient:
			httpClient.close()
