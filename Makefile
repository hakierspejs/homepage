run:
	docker run --rm --volume=".:/srv/jekyll" --publish 0.0.0.0:4000:4000 jekyll/jekyll jekyll serve
