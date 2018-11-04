
Feature: Serach Users

  The client want find all users that corresponding to his keyword
  He want that list paginated by 15 items, so he will send a number of page that he want

  Scenario: Exists users that corresponding to his search
    Given that client send a keyword that existis totaly or partialy in name or username
    And send a number of page gratter than zero
    When he make the request
    Then client recives a list of users that coitain his keyword ordered by priority

