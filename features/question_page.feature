Feature: Question Page
  As a fucking user
  I want to be able to browse BTG's question page
  So that I can ask shity questions.

Scenario: User visits the question page
  Given I visit "/question" page
  Then it should have a title "Question"
  And should see some "Ang pangutana nimo nga nag tangag og dako'ng ganti"
