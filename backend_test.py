#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Website
Tests the contact form endpoints and database operations
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://skills-showcase-48.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        print(f"   {message}")
        if details:
            print(f"   Details: {details}")
        print()
        
        if not success:
            self.failed_tests.append(test_name)
    
    def test_backend_connectivity(self):
        """Test basic backend connectivity"""
        try:
            response = requests.get(f"{self.backend_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Backend Connectivity", True, "Backend is accessible and responding correctly")
                    return True
                else:
                    self.log_test("Backend Connectivity", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Backend Connectivity", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Backend Connectivity", False, f"Connection failed: {str(e)}")
            return False
    
    def test_contact_form_valid_data(self):
        """Test POST /api/contact with valid contact form data"""
        valid_data = {
            "name": "John Doe",
            "email": "john@example.com", 
            "subject": "Collaboration Opportunity",
            "message": "Hi Chirag, I'd like to discuss a potential collaboration on a web development project. I'm impressed by your portfolio and would love to explore working together on some exciting projects."
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=valid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if (data.get("success") is True and 
                    "message" in data and 
                    "data" in data and 
                    "id" in data["data"]):
                    self.log_test("Contact Form - Valid Data", True, 
                                "Successfully submitted valid contact form", 
                                f"Response: {data}")
                    return data["data"]["id"]  # Return ID for later verification
                else:
                    self.log_test("Contact Form - Valid Data", False, 
                                f"Invalid response format: {data}")
                    return None
            else:
                self.log_test("Contact Form - Valid Data", False, 
                            f"HTTP {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            self.log_test("Contact Form - Valid Data", False, f"Request failed: {str(e)}")
            return None
    
    def test_contact_form_invalid_name(self):
        """Test validation with invalid name (too short)"""
        invalid_data = {
            "name": "J",  # Too short
            "email": "john@example.com",
            "subject": "Test Subject",
            "message": "This is a test message that is long enough to pass validation."
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test("Contact Form - Invalid Name", True, 
                            "Correctly rejected short name", 
                            f"Response: {response.text}")
            else:
                self.log_test("Contact Form - Invalid Name", False, 
                            f"Expected 422 error, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Name", False, f"Request failed: {str(e)}")
    
    def test_contact_form_invalid_email(self):
        """Test validation with invalid email format"""
        invalid_data = {
            "name": "John Doe",
            "email": "invalid-email",  # Invalid format
            "subject": "Test Subject",
            "message": "This is a test message that is long enough to pass validation."
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test("Contact Form - Invalid Email", True, 
                            "Correctly rejected invalid email format", 
                            f"Response: {response.text}")
            else:
                self.log_test("Contact Form - Invalid Email", False, 
                            f"Expected 422 error, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Email", False, f"Request failed: {str(e)}")
    
    def test_contact_form_invalid_subject(self):
        """Test validation with invalid subject (too short)"""
        invalid_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Hi",  # Too short (min 5 chars)
            "message": "This is a test message that is long enough to pass validation."
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 400:
                self.log_test("Contact Form - Invalid Subject", True, 
                            "Correctly rejected short subject", 
                            f"Response: {response.text}")
            else:
                self.log_test("Contact Form - Invalid Subject", False, 
                            f"Expected 400 error, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Subject", False, f"Request failed: {str(e)}")
    
    def test_contact_form_invalid_message(self):
        """Test validation with invalid message (too short)"""
        invalid_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Test Subject",
            "message": "Short"  # Too short (min 10 chars)
        }
        
        try:
            response = requests.post(
                f"{self.backend_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 400:
                self.log_test("Contact Form - Invalid Message", True, 
                            "Correctly rejected short message", 
                            f"Response: {response.text}")
            else:
                self.log_test("Contact Form - Invalid Message", False, 
                            f"Expected 400 error, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Message", False, f"Request failed: {str(e)}")
    
    def test_get_contact_messages(self):
        """Test GET /api/contact/messages endpoint"""
        try:
            response = requests.get(
                f"{self.backend_url}/contact/messages",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if (data.get("success") is True and 
                    "data" in data and 
                    isinstance(data["data"], list)):
                    self.log_test("Get Contact Messages", True, 
                                f"Successfully retrieved {len(data['data'])} messages", 
                                f"Response format correct")
                    return data["data"]
                else:
                    self.log_test("Get Contact Messages", False, 
                                f"Invalid response format: {data}")
                    return None
            else:
                self.log_test("Get Contact Messages", False, 
                            f"HTTP {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            self.log_test("Get Contact Messages", False, f"Request failed: {str(e)}")
            return None
    
    def test_message_storage_verification(self, message_id):
        """Verify that submitted message is stored correctly in database"""
        if not message_id:
            self.log_test("Message Storage Verification", False, "No message ID to verify")
            return
            
        messages = self.test_get_contact_messages()
        if messages is None:
            self.log_test("Message Storage Verification", False, "Could not retrieve messages")
            return
            
        # Look for our test message
        found_message = None
        for msg in messages:
            if msg.get("id") == message_id:
                found_message = msg
                break
        
        if found_message:
            # Verify required fields
            required_fields = ["id", "name", "email", "subject", "message", "timestamp", "status"]
            missing_fields = [field for field in required_fields if field not in found_message]
            
            if not missing_fields:
                if (found_message["name"] == "John Doe" and 
                    found_message["email"] == "john@example.com" and
                    found_message["status"] == "new"):
                    self.log_test("Message Storage Verification", True, 
                                "Message stored correctly with all required fields", 
                                f"Message: {found_message}")
                else:
                    self.log_test("Message Storage Verification", False, 
                                f"Message data doesn't match expected values: {found_message}")
            else:
                self.log_test("Message Storage Verification", False, 
                            f"Missing required fields: {missing_fields}")
        else:
            self.log_test("Message Storage Verification", False, 
                        f"Message with ID {message_id} not found in database")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("PORTFOLIO WEBSITE BACKEND API TESTING")
        print("=" * 60)
        print(f"Testing backend at: {self.backend_url}")
        print()
        
        # Test 1: Basic connectivity
        if not self.test_backend_connectivity():
            print("❌ Backend connectivity failed. Stopping tests.")
            return False
        
        # Test 2: Valid contact form submission
        message_id = self.test_contact_form_valid_data()
        
        # Test 3-6: Invalid data validation tests
        self.test_contact_form_invalid_name()
        self.test_contact_form_invalid_email()
        self.test_contact_form_invalid_subject()
        self.test_contact_form_invalid_message()
        
        # Test 7: Get messages endpoint
        self.test_get_contact_messages()
        
        # Test 8: Verify message storage
        if message_id:
            self.test_message_storage_verification(message_id)
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        
        if self.failed_tests:
            print(f"\nFailed Tests:")
            for test in self.failed_tests:
                print(f"  - {test}")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)