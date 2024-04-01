from card import Card
from random import shuffle

class Deck:
    """Represents a deck of playing cards."""
    suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    
    def __init__(self):
        self.cards = [Card(suit, value) for suit in self.suits for value in Card.values]
    
    def shuffle(self):
        """Shuffles the deck."""
        shuffle(self.cards)
    
    def deal(self, num_cards):
        """Deals num_cards from the deck."""
        dealt_cards = self.cards[:num_cards]
        self.cards = self.cards[num_cards:]
        return dealt_cards
