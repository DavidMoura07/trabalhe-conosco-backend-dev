
Feature: Serach Users

  I want find all users that corresponding to some keyword
  I want that list paginated by 15 items, so I will send a number of page that I want
  I want too that this list become ordered by priority

  Scenario: I request for a list of users
    Given I send "Silva" as keyword
    And send 1 as page number
    When I make the request
    Then I recive 200 status code

