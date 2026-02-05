import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize WebDriver
driver = webdriver.Edge()

# Navigate to the login page
driver.get("https://ay25-ca2.onrender.com/login.html")

# Locate and interact with the username and password fields
username = driver.find_element(By.ID, "studentName")
password = driver.find_element(By.ID, "accessCode")

# Login credentials 
username.send_keys("Jairus Wong An") # Enter your username
password.send_keys("9242") # Enter your password

# Submit the login form
# Submit the login form
login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
login_button.click()

# Validate the result by checking for the presence of a success or error message
try:
    success_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[@class='flash success']"))
    )
    print("Login successful:", success_message.text)
except:
    print("Login failed. Please check credentials or page elements.")





# Validate the result by checking for the presence of a success or error message
try:
    success_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[@class='flash success']"))
    )
    print("Login successful:", success_message.text)
except:
    print("Login failed. Please check credentials or page elements.")

driver.get("https://ay25-ca2.onrender.com/refundForm.html?name=Jairus%20Wong")
username = driver.find_element(By.ID, "userName")
status = driver.find_element(By.ID, "itemStatus")
returnReason = driver.find_element(By.ID, "returnReason")
POPStation = driver.find_element(By.ID, "deliveryPOPStation")
textbox_placeholder = returnReason.get_attribute("placeholder")
textbox_value = returnReason.get_attribute("value")

username.send_keys("Peter Pan")
status.send_keys("Unopened")
value = ("Found a cheaper alternative elsewhere")
if not POPStation.is_selected():
    POPStation.click()

# Submit the login form
submit_button = driver.find_element(By.ID, "submitBtn")
submit_button.click()

driver.quit()