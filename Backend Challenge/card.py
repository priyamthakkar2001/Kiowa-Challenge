class Card:
    """Represents a single playing card."""
    values = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
              'J': 11, 'Q': 12, 'K': 13, 'A': 14}
    
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value
    
    def __repr__(self):
        return f"{self.value} of {self.suit}"
    
    def compare_value(self, other):
        """Compares this card to another card for sorting."""
        return self.values[self.value] - self.values[other.value]
    
    def numeric_value(self):
        """Returns the numeric value of the card for game logic."""
        return self.values[self.value]
