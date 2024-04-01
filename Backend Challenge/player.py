class Player:
    """Represents a player in the game."""
    def __init__(self, name):
        self.name = name
        self.hand = []
    
    def receive_cards(self, cards):
        """Receives cards dealt from the deck."""
        self.hand += cards
    
    def __repr__(self):
        return f"{self.name}: {', '.join(map(str, self.hand))}"
