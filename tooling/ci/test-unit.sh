#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

# Run tests
npm run test:ci || {
    echo 'npm run test:ci failed!';
    exit 1;
}

# Convert coverage format
node tooling/convert-coverage-results.js

# Upload coverage report
bash <(curl -s https://codecov.io/bash)

