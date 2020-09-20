run: 
	docker run -p 54000:4000 -v $(CURDIR):/site bretfisher/jekyll-serve
