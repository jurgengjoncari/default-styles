# Default Styles
In this project, I've included an HTML file with (almost) all the elements, for testing purposes. 

I want to decide here how I want some elements to be styled by default. Then use it for all my other projects. The first step is to have it look the same in all user agents, by maybe resetting all their behaviors. Then make the page accessible; make it responsive and add dark mode. 

The goal is to be able to include all types of data; small and big images, short and long paragraphs, small and large tables, etc. 

Idea: Organize CSS by dividing HTML in levels, where first level is that where block elements decide the layout of the page. Then, the other levels will be each of these block elements. I think I'm already doing the first thing with the "webpage-template" repo, and the second one with "web-components" repo. 

The page is organized into landmarks:
- Banner
- Main
- Aside
- Complementary
- Contentinfo

Then every other element is part of these landmarks.
