AI Development Workflow Comparison

Round One: Vague Prompt

Round One used a deliberately vague one-sentence prompt to build a small settings form. The AI produced a working-looking form, but the implementation received less explicit direction about validation, accessibility, testing, and project structure. I reviewed the generated UI manually and saved the work on the "round-one-vague" branch.

Round Two: Precise Prompt

Round Two used a fresh branch and a fresh AI session. The prompt specified the relevant files, expected form behavior, validation requirements, accessibility constraints, examples, and a verification loop. The AI was instructed to implement the feature, write tests, and run them. This produced a more structured implementation with "SettingsForm.jsx", "SettingsForm.test.jsx", "validateSettings.js", and "validateSettings.test.js".

The branch diff provides concrete evidence of the difference. Round Two added 10 changed files, including 157 lines in the settings component, 77 lines of component tests, 34 lines of validation logic, and 49 lines of validation tests. It also added Testing Library dependencies and test setup.

Correctness and Verification

Round Two required stronger verification, but verification caught several problems. The generated tests initially failed because "React" was not defined in the test and component files. After fixing those imports, tests exposed another issue: tests were not cleaning up between renders, causing multiple matching elements. Adding "cleanup" through "afterEach" resolved that issue. The final test suite passed, and lint and the production build also passed.

Accessibility and Edge Cases

The Round Two implementation included associated labels, field-specific error messages, "role="alert"", "aria-invalid", and "aria-describedby". The tests covered empty submission, invalid input, successful submission, and reset behavior. Manual testing also confirmed that the form displayed validation errors, accepted valid data, and reset correctly.

Review Effort and Lesson

Round Two required more initial prompting effort, but the additional constraints reduced ambiguity and made verification more systematic. The main lesson is that AI-generated code should never be accepted without testing and review. Precise specifications, explicit examples, and a verification loop produced a more reviewable workflow than the vague prompt.