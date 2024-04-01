from deck import Deck
from player import Player
from collections import Counter

class Game:
    """Handles the game logic."""
    def __init__(self):
        self.deck = Deck()
        self.deck.shuffle()
        self.players = []
    
    def add_player(self, player):
        """Adds a player to the game."""
        self.players.append(player)
    
    def deal_cards(self):
        """Deals 3 cards to each player."""
        for player in self.players:
            player.receive_cards(self.deck.deal(3))
    
    def find_winner(self):
        """Determines the winner of the game."""
        scores = {}
        for player in self.players:
            scores[player] = self.evaluate_hand(player.hand)
        
        sorted_players = sorted(scores.items(), key=lambda x: (x[1][0], x[1][1]), reverse=True)
        winner, _ = sorted_players[0]
        return winner
    
    def evaluate_hand(self, hand):
        values = [card.numeric_value() for card in hand]
        value_counts = Counter(values)
        sorted_values = sorted(values, reverse=True)
        
        if 3 in value_counts.values():
            return (4, sorted_values[0])
        if sorted_values == list(range(sorted_values[2], sorted_values[2] + 3)):
            return (3, sorted_values[0])
        if 2 in value_counts.values():
            return (2, max(val for val, count in value_counts.items() if count == 2))
        return (1, sorted_values[0])
