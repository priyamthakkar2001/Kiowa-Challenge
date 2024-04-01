from game import Game
from player import Player

def main():
    game = Game()
    players = [Player(f"Player {i+1}") for i in range(4)]
    for player in players:
        game.add_player(player)

    game.deal_cards()

    for player in game.players:
        print(f"{player.name} has been dealt: {player}")

    winner = game.find_winner()

    print(f"Winner is {winner}")

if __name__ == "__main__":
    main()
