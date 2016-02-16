Feature: Question Page
  As a fucking user
  I want to be able to browse BTG's question page
  So that I can ask shity questions.

Scenario: User want to ask question
  Given I visit "/question" page
  Then it should have a title "Question"
  And some "I can post my awesome question"

