"""class Text(Node):

    fontname = None
    fontsize = 36 
    fontcolor = Color('black')
    background = None
    italic = False
    bold = False
    underline = False

    super().__init__(**options)
    self.__dict__.update(Text.options)

def set_font(self):
    #set font and properties
    self.font = pygame.font.Font(self.fontname, self.fontsize)
    self.font.set_bold(self.bold)
    self.font.set_italic(self.italic)
    self.font.set_underline(self.underline)

def render(self):
    #render text into image
    self.img = self.font.render(self.text, True, self.fontcolor, self.background)
    self.rect.size = self.img.get_size()"""

import pygame
from app import *

import pygame
from pygame.locals import *

class App:
    """Create a single-window app with multiple scenes."""

    def __init__(self):
        """Initialize pygame and the application."""
        pygame.init()
        flags = RESIZABLE
        self.screen = pygame.display.set_mode((640, 480), flags)
        pygame.display.set_caption('Pygame App')
        self.running = True

    def run(self):
        """Run the main event loop."""
        while self.running:
            for event in pygame.event.get():
                if event.type == QUIT:
                    self.running = False
            self.screen.fill((255, 255, 255))  # Fill the screen with white
            pygame.display.flip()
        pygame.quit()

class Node:
    """A basic drawable object."""

    def __init__(self, **options):
        self.options = options
        self.rect = pygame.Rect(0, 0, 100, 50)  # Default rectangle

    def draw(self, surface):
        """Draw the node on the given surface."""
        pygame.draw.rect(surface, (0, 0, 0), self.rect)  # Draw a black rectangle


class Demo(App):
    def __init__(self):
        super().__init__()
        Scene(caption='Text')
        Text('Default text')
        Text('fontsize = 24', fontsize=24)
        Text('fontcolor = RED', fontcolor=Color('red'))
        Text('48 pts, blue', fontsize=48, fontcolor=Color('blue'))
        Text('fontbg = yellow', fontbg=Color('yellow'))

        Text('italic', pos=(400, 20), italic=True)
        Text('bold', bold=True)
        Text('underline', underline=True, font_bg=None)

if __name__ == '__main__':
    Demo().run()
