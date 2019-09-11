SLIDES := $(patsubst %.slides.md,%.slides.pdf,$(wildcard *.slides.md))

all : $(SLIDES)

%.slides.pdf : %.slides.md
	pandoc $^ -t beamer -V theme:metropolis --filter pandoc-citeproc --highlight-style pygments --slide-level 2 --include-in-header header.tex -o $@

clobber :
	rm -f $(SLIDES)
